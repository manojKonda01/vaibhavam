import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
export declare const validate: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=validate.d.ts.map