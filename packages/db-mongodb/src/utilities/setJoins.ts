import type { MongooseQueryOptions } from 'mongoose'
import type { Document, JoinQuery, Payload } from 'payload'

type Args = {
  collection: string
  doc: Document
  joins: JoinQuery
  options: MongooseQueryOptions
  payload: Payload
}

// TODO: pass in queryParam called `joins` to specify the pagination of each join
// joins[schemaPath][page]=2&joins[schemaPath][limit]=100

/**
 * // fetch docs and add to the keys by path
 * @param collection
 * @param doc
 * @param options
 * @param joins,
 * @param payload
 */
export const setJoins = async ({
  collection,
  doc,
  joins = {},
  options,
  payload,
}: Args): Promise<Document> => {
  const joinConfig = payload.collections[collection].joins

  await Promise.all(
    Object.keys(joinConfig).map(async (slug) => {
      const joinModel = payload.db.collections[slug]
      const { defaultSort } = payload.collections[slug].config

      for (const join of joinConfig[slug]) {
        // get the query options for the join off of req
        // TODO: allow disabling the join completely
        // if (joins[join.schemaPath] === false || req.query[join.schemaPath] === 'false') {
        //   continue
        // }

        const { limit, page, sort } = {
          limit: 10,
          page: 1,
          sort: defaultSort,
          ...(joins[join.schemaPath] ?? {}),
        }

        const joinData = await joinModel
          .find(
            { [join.field.on]: { $eq: doc._id.toString() } },
            {
              _id: 1,
            },
            options,
          )
          .sort(sort === 'id' ? '_id' : sort)
          .skip((page - 1) * limit)
          .limit(limit)

        // iterate schemaPath and assign to the document
        const path = join.schemaPath.split('.')
        let current = doc
        for (let i = 0; i <= path.length - 1; i++) {
          if (i === path.length - 1) {
            current[path[i]] = joinData.map((a) => a._id)
          } else {
            if (!current[path[i]]) {
              current[path[i]] = {}
            }
            current = current[path[i]]
          }
        }
      }
    }),
  )

  return doc
}
