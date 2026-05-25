import { nullToEmptyStr } from "@/helpers";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const contact = {
    sendEmail: defineAction({
        accept: 'form',
        input: z.object({
            name: z.preprocess(
                nullToEmptyStr,
                z.string().min(1, { message: "El nombre no puede ir vacio" })
            ),
            email: z.preprocess(
                nullToEmptyStr,
                z.string().min(1, { message: "El email no puede ir vacio" }).email({ message: "Email invalido" })
            ),
            subject: z.preprocess(
                nullToEmptyStr,
                z.string().min(1, { message: "El asunto no puede ir vacio" })
            ),
            message: z.preprocess(
                nullToEmptyStr,
                z.string().min(1, { message: "El mensaje no puede ir vacio" })
            ),
        }),
        handler: async (input) => {
            const url = `${import.meta.env.HOME_URL}/wp-json/contact-form-7/v1/contact-forms/132/feedback`

            const formData = new FormData()
            formData.append('your-name', input.name)
            formData.append('your-email', input.email)
            formData.append('your-subject', input.subject)
            formData.append('your-message', input.message)
            formData.append('_wpcf7_unit_tag', 'wpcf7-f132-p1141-o1')

            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            })
            await response.json();

            return {
                error: false,
                message: 'Tu mensaje se envió correctamente'
            }
        },
    }),
}