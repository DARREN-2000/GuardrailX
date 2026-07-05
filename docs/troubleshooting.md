# Troubleshooting

## Spacy Model Not Found Error
If you encounter an error indicating `en_core_web_lg` cannot be found during backend startup, ensure you have installed the requirements correctly.
The SpaCy model must be downloaded directly via the URL in `requirements.txt`. Do not run `python -m spacy download` manually if it fails with a 404.

## Database Connection Issues
If the backend fails to boot with a `ConnectionRefusedError`, verify that your PostgreSQL instance is running and the `DATABASE_URL` matches your local credentials.

## Frontend Dependencies
If `npm ci` fails on the frontend, ensure you are appending `--legacy-peer-deps`.
