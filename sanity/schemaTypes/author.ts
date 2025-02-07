import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "number",
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "username",
      title: "Username",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image URL",
      type: "url",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media: media ? { url: media } : undefined,
      };
    },
  },
});
