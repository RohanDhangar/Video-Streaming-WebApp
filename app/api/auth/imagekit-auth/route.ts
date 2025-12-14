import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {
    try {
        const authenticationParams = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,

            // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
            // token: "random-token", // Optional, a unique token for request
        })

        return Response.json({ authenticationParams, publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY })
    }
    catch (error) {
        return Response.json(
        {
            error: "Authentication on imagekit failed",
        },

        { 
            status: 500 
        })

    }
}