# Sooth
FOSS (self hosted media server) written in Fresh / Deno
 
## Development

Start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

## Migrations
### Create migration
`deno run -A --unstable https://deno.land/x/nessie/cli.ts make create_users`

### Migrate [amount?]
`deno run -A --unstable https://deno.land/x/nessie/cli.ts migrate`
`deno run -A --unstable https://deno.land/x/nessie/cli.ts migrate 1`

### Rollback [amount?]
`deno run -A --unstable https://deno.land/x/nessie/cli.ts rollback`
`deno run -A --unstable https://deno.land/x/nessie/cli.ts rollback 1`
`deno run -A --unstable https://deno.land/x/nessie/cli.ts rollback all`
