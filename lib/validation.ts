import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(100),
  category: z.string().min(3).max(100),
  link: z
    .string()
    .url()
    .refine(async (value) => {
      try {
        const res = await fetch(value, { method: "HEAD" });
        const contentType = res.headers.get("Content-Type");
        if (contentType?.startsWith("image/")) {
          return true;
        }
        return false;
      } catch (e) {
        return false;
      }
    }),
  pitch: z.string().min(3),
});
