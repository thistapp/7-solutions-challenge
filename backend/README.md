# Users by Department API

A small server that loads users from [dummyjson.com/users](https://dummyjson.com/users) and groups them by department.

Built with:

- Node.js
- TypeScript (ES modules)
- Express
- Vitest

## Getting started

You need Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3001/users/by-department

| Command              | What it does                                        |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Start the server. It restarts when you save a file. |
| `npm test`           | Run all tests once.                                 |
| `npm run test:watch` | Run the tests again on every save.                  |
| `npm run typecheck`  | Check the types.                                    |

## API

### `GET /users/by-department`

Returns one summary for each department.

```json
{
	"Engineering": {
		"male": 11,
		"female": 8,
		"ageRange": "25-46",
		"hair": {"Brown": 3, "Gray": 4, "Red": 3},
		"addressUser": {"EmilyJohnson": "29112"}
	}
}
```

| Field            | Meaning                                         |
| ---------------- | ----------------------------------------------- |
| `male`, `female` | Number of users of each gender                  |
| `ageRange`       | Youngest and oldest age, as `min-max`           |
| `hair`           | Number of users with each hair color            |
| `addressUser`    | Full name (no space) and the user's postal code |

If dummyjson.com cannot be reached, the server returns status `502`.

## How it works

```
request -> cache -> fetch users -> group by department -> response
```

| File                         | Job                                      |
| ---------------------------- | ---------------------------------------- |
| `src/server.ts`              | Starts the server and connects the parts |
| `src/app.ts`                 | The Express app and the route            |
| `src/user-api.ts`            | Loads users from dummyjson.com           |
| `src/group-by-department.ts` | Groups users and builds each summary     |
| `src/cache.ts`               | Keeps the result for a short time        |
| `src/types.ts`               | Types for the input data and the result  |

Two design choices make the code easy to test:

- It takes a list of users and returns the result. It does not use the network.
- The app gets its data from a function passed to `createApp`.

## Performance

- **One loop.** Every user is read once. All counts and the min and max age are updated in the same loop, with no sorting.
- **Small download.** `limit=0` gets all users in one request. `select` asks only for the fields we use.
- **Cache.** The result is kept for 60 seconds. Requests that arrive at the same time share one download. A failed download is not cached.

## Tests

The tests use Vitest and do not need the internet.

| File                          | What it checks                                                              |
| ----------------------------- | --------------------------------------------------------------------------- |
| `group-by-department.test.ts` | Counts, age range, hair colors and postal codes, plus an empty list         |
| `cache.test.ts`               | The result is reused, expires after the time limit, and errors are not kept |
| `app.test.ts`                 | The route returns the data as JSON, or `502` when loading fails             |

## Notes

- The user's own `address.postalCode` is used, not the company address.
- `addressUser` uses the full name as the key, as the task asks. Two users with the same name in one department would overwrite each other. A real system would use the user `id`.
