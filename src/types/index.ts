import { z } from 'astro/zod';

const imageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number(),
});

const featured_imagesSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    medium_large: imageSchema,
    large: imageSchema,
    full: imageSchema,
});

export const BaseWPSchema = z.object({
    id: z.number(),
    title: z.object({
        rendered: z.string(),
    }),
    slug: z.string(),
    content: z.object({
        rendered: z.string(),
    }),
    featured_images: featured_imagesSchema,
    acf: z.object({
        subtitulo: z.string(),
    }),
    _links: z.object({}),
});

const gallerySchema = z.object({
    large: imageSchema,
    full: imageSchema,
});

export const GalleryPageSchema = BaseWPSchema.extend({
    gallery: z.array(gallerySchema)
});


const procesoSchema = z.object({
    titulo: z.string(),
    descripcion: z.string(),
    imagen: z.string(),
});

export const ProcesoPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitulo: z.string()
    }).catchall(procesoSchema)
});


export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

export const CategoriesSlugSchema = z.array(CategorySchema.pick({
    slug: true,
}))


export const CategoriesSchema = z.array(CategorySchema);

export const BlogSchema = BaseWPSchema.omit({
    acf: true
}).extend({
    date: z.string(),
    category_details: CategoriesSchema
});

export const BlogsSchema = z.array(BlogSchema);


const MenuItemSchema = BaseWPSchema.pick({
    title: true,
    featured_images: true,
}).extend({
    acf: z.object({
        price: z.coerce.number(),
        description: z.string(),
    })
})

export const MenuItemsSchema = z.array(MenuItemSchema);


export type Post = z.infer<typeof BlogSchema>

export type Gallery = z.infer<typeof gallerySchema>

export type FeatureImages = z.infer<typeof featured_imagesSchema>
