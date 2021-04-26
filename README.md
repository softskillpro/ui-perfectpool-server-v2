# Perfect Pool Server v2.0

External adapter built to get World Cup result information from the following website:

[The Soccer World Cups](https://www.thesoccerworldcups.com/)

## Input Params

- `jobRunID`: The job ID number
- `year`: The year of the world cup tournament

## Output

```json
{
 "jobRunID": "1",
 "data": {
  "result": "0x00000000000000000000000000000009d9ed695a9b699a7afd57955a6a955aa7"
 },
 "statusCode": 200
}
```

## Install Locally

Install dependencies:

```bash
yarn
```

### Test

Run the local tests:

```bash
yarn test
```