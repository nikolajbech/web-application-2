import { mkdir, appendFile, writeFile } from 'fs'

const name = process.argv[2]?.trim()

if (!name?.[0]) {
  throw Error('Component name is required')
}

if (name[0].toUpperCase() !== name[0]) {
  throw Error('Component name must start with a capital letter')
}

const lowerCased = name[0].toLowerCase() + name.slice(1)

const dbModel = `
export const ${lowerCased}s = createTable('${lowerCased}', {
  id: text('id').notNull().primaryKey(),
  name: text('name').notNull(),
})
`

const getOne = `import { z } from 'zod'

import { publicProcedure } from '../../trpc'
import { db } from '@/server/db'

export const ${lowerCased} = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ input }) => {
    const { id } = input

    return get${name}(id)
  })

export const get${name} = (id: string) => {
  return db.query.${lowerCased}s.findFirst({
    where: (q, { eq }) => eq(q.id, id),
  })
}
`

const getAll = `import { z } from 'zod'

import { publicProcedure } from '../../trpc'
import { db } from '@/server/db'

export const ${lowerCased}s = publicProcedure
  .query(async () => {
    return getProjects()
  })

export const getProjects = () => {
  return db.query.${lowerCased}s.findMany()
}
`

const create = `import { z } from 'zod'

import { protectedProcedure } from '../../trpc'
import { ${lowerCased}s } from '@/server/db/schema'

export const create${name} = protectedProcedure
  .input(
    z.object({
      name: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { db } = ctx
    const { name } = input

    const id = crypto.randomUUID()

    await db.insert(${lowerCased}s).values({
      id,
      name,
    })

    return db.query.${lowerCased}s.findFirst({
      where: (q, { eq }) => eq(q.id, id),
    })
  })
`

const update = `import { z } from 'zod'

import { protectedProcedure } from '../../trpc'
import { ${lowerCased}s } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const update${name} = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { db } = ctx
    const { id, ...rest } = input

    const ${lowerCased}ToBeUpdated = await db.query.${lowerCased}s.findFirst({
      where: (q, { eq }) => eq(q.id, id),
    })

    if (!${lowerCased}ToBeUpdated) {
      throw new Error('${name} not found')
    }

    return db
      .update(${lowerCased}s)
      .set({
        ...rest,
      })
      .where(eq(${lowerCased}s.id, ${lowerCased}ToBeUpdated.id))
  })

`

const del = `import { z } from 'zod'

import { protectedProcedure } from '../../trpc'
import { ${lowerCased}s } from '@/server/db/schema'
import { eq } from 'drizzle-orm'

export const delete${name} = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const { db } = ctx
    const { id } = input

    const ${lowerCased}ToBeDeleted = await db.query.${lowerCased}s.findFirst({
      where: (q, { eq }) => eq(q.id, id),
    })

    if (!${lowerCased}ToBeDeleted) {
      throw new Error('${name} not found')
    }

    return await db
      .delete(${lowerCased}s)
      .where(eq(${lowerCased}s.id, ${lowerCased}ToBeDeleted.id))
      .returning({ deletedId: ${lowerCased}s.id })
  })

`

const router = `import { createTRPCRouter } from '../../trpc'
import { create${name} } from './create${name}'
import { delete${name} } from './delete${name}'
import { ${lowerCased} } from './${lowerCased}'
import { ${lowerCased}s } from './${lowerCased}s'
import { update${name} } from './update${name}'

export const ${lowerCased}Router = createTRPCRouter({
  ${lowerCased},
  ${lowerCased}s,
  create${name},
  update${name},
  delete${name},
})
`

// Make API dir
mkdir(`./src/server/api/routers/${lowerCased}`, (err) => {
  if (err) throw err
  console.log('Created', name)
})

// Write files
appendFile(`./src/server/db/schema.ts`, dbModel, (err) => {
  if (err) throw err
  console.log('Created', name)
})

writeFile(
  `./src/server/api/routers/${lowerCased}/${lowerCased}.ts`,
  getOne,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

writeFile(
  `./src/server/api/routers/${lowerCased}/${lowerCased}s.ts`,
  getAll,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

writeFile(
  `./src/server/api/routers/${lowerCased}/create${name}.ts`,
  create,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

writeFile(
  `./src/server/api/routers/${lowerCased}/update${name}.ts`,
  update,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

writeFile(
  `./src/server/api/routers/${lowerCased}/delete${name}.ts`,
  del,
  (err) => {
    if (err) throw err
    console.log('Created', name)
  },
)

writeFile(`./src/server/api/routers/${lowerCased}/router.ts`, router, (err) => {
  if (err) throw err
  console.log('Created', name)
})

console.log('Add:')
console.log(`${lowerCased}: ${lowerCased}Router,`)
console.log('to root.ts')
