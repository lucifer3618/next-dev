import { v } from "convex/values"

const { mutation, query } = require("./_generated/server")

export const CreateUser = mutation({
    args: {
        username: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field('email'), args.email)).collect();

        if (user?.length === 0) {
            await ctx.db.insert('users', {
                username: args.username,
                email: args.email,
                picture: args.picture,
                uid: args.uid,
                token: 50000,
            });
        }
    }
})

export const GetUser = query({
    args:{
        email: v.string()
    },
    handler:async(ctx, args) => {
        const user = await ctx.db.query("users").filter((q) => q.eq(q.field('email'), args.email)).collect();
        return user[0];
    }
})

export const UpdateTokens = mutation({
    args: {
        token: v.number(),
        userId: v.id('users'),
    },
    handler:async(ctx, args) => {
        const result = await ctx.db.patch(args.userId, {
            token: args.token,
        });
        return result;
    }
})
