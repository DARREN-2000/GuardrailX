# Release Process

This document outlines the standard release process for Aegis.

## Versioning Scheme
We follow strict Semantic Versioning (`MAJOR.MINOR.PATCH`).

## Pre-Release Steps
1. Ensure all features and bugfixes for the milestone are merged into `main`.
2. Ensure CI/CD tests pass on the `main` branch.
3. Update the `CHANGELOG.md` moving the `[Unreleased]` section to the target version number and date.
4. Bump version numbers in `backend/app/__init__.py` and `frontend/package.json`.

## Release Steps
1. Create a tag: `git tag -a v1.0.0 -m "Release v1.0.0"`
2. Push the tag: `git push origin v1.0.0`
3. In GitHub, go to Releases -> Draft a new release.
4. Select the tag, copy the relevant `CHANGELOG.md` section into the release notes.
5. Publish Release.

## Post-Release
- Create a new `[Unreleased]` section in the `CHANGELOG.md`.
