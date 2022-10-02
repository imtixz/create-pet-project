import { z } from "zod";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  getUser: t.procedure.input(z.string()).query((req: any) => {
    console.log(req.input);
    return { id: 1, name: req.input };
  }),
  createUser: t.procedure
    .input(z.object({ name: z.string().min(5) }))
    .mutation(async (req: any) => {
      console.log(req.input.name);
      return { msg: `hello ${req.input.name}` };
    }),
});
export type AppRouter = typeof appRouter;

const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);
app.listen(4000, () => {
  console.log("Listening to port 4000!");
});
