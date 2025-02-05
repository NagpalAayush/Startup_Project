import { defineField, defineType } from "sanity";

export const startup = defineType({
  name: "startup",
  title: "Startup",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "author",
      type: "reference", // Corrected "refrence" to "reference"
      to: { type: "author" }, // Fixed typo here
    }),
    defineField({
      name: "views",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category", // Fixed "catagory" to "category"
      type: "string",
      validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category"), // Also fixed the error message
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required().error("Please enter an image"),
    }),
    defineField({
      name: "pitch",
      type: "markdown",
    }),
  ],
});
