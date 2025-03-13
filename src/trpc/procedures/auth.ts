import { procedure } from "../trpc";
import { withAuth } from "../middleware/with-auth";

const authProcedure = procedure.use(withAuth);

export default authProcedure;
