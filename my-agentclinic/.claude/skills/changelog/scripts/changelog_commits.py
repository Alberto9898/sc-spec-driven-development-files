#!/usr/bin/env python3
"""Raccoglie i commit non ancora presenti in CHANGELOG.md e li stampa come JSON.

Va eseguito dalla root del progetto. Considera solo i commit che toccano questa
cartella (il repository git può contenere altro), esclude i merge commit e i
commit che modificano solo CHANGELOG.md. Il punto di partenza è il marcatore
`<!-- changelog:last-commit <sha> -->` in CHANGELOG.md, non la data dell'ultimo
titolo: così due merge nello stesso giorno non perdono commit.

Lo script non modifica nessun file.
"""

import json
import re
import subprocess
import sys
from collections import defaultdict
from pathlib import Path

CHANGELOG = Path("CHANGELOG.md")
MARKER = re.compile(r"<!--\s*changelog:last-commit\s+([0-9a-f]{7,40})\s*-->")


def git(*args):
    result = subprocess.run(
        ["git", *args], capture_output=True, text=True, encoding="utf-8", check=True
    )
    return result.stdout


def is_ancestor(sha, head):
    result = subprocess.run(["git", "merge-base", "--is-ancestor", sha, head])
    return result.returncode == 0


def changed_files(sha):
    out = git("show", "--name-only", "--relative", "--format=", sha, "--", ".")
    return [line for line in out.splitlines() if line.strip()]


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    head = git("rev-parse", "HEAD").strip()
    branch = git("rev-parse", "--abbrev-ref", "HEAD").strip()
    dirty = [line for line in git("status", "--porcelain", "--", ".").splitlines() if line]

    exists = CHANGELOG.exists()
    last = None
    warnings = []
    if exists:
        match = MARKER.search(CHANGELOG.read_text(encoding="utf-8"))
        if match:
            last = git("rev-parse", match.group(1)).strip()
            if not is_ancestor(last, head):
                warnings.append(
                    f"Il commit del marcatore ({last[:7]}) non è un antenato di HEAD "
                    "(rebase o branch diverso): i commit vanno controllati a mano."
                )
                last = None
        else:
            warnings.append(
                "CHANGELOG.md esiste ma non ha il marcatore changelog:last-commit: "
                "vengono elencati tutti i commit, da confrontare con le voci già presenti."
            )

    rev_range = f"{last}..{head}" if last else head
    log = git(
        "log", "--no-merges", "--date=short",
        "--format=%H%x1f%ad%x1f%s%x1f%b%x1e", rev_range, "--", ".",
    )

    by_date = defaultdict(list)
    skipped = 0
    for record in log.split("\x1e"):
        record = record.strip()
        if not record:
            continue
        sha, date, subject, body = (record.split("\x1f") + [""])[:4]
        files = changed_files(sha)
        if files == ["CHANGELOG.md"]:
            skipped += 1
            continue
        body = "\n".join(
            line for line in body.strip().splitlines()
            if not line.lower().startswith("co-authored-by:")
        ).strip()
        by_date[date].append(
            {"sha": sha[:7], "subject": subject, "body": body, "files": files}
        )

    print(json.dumps({
        "changelog_exists": exists,
        "branch": branch,
        "head": head,
        "last_recorded_commit": last,
        "uncommitted_changes": dirty,
        "skipped_changelog_only_commits": skipped,
        "warnings": warnings,
        "commits_by_date": dict(sorted(by_date.items(), reverse=True)),
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
