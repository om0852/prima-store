import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparty from "multiparty";
import fs from "fs";
import mime from "mime-types";
import { isAdminRequest } from "./auth/[...nextauth]";
import { connectToDB } from "@/lib/connect";
export default async function handler(req, res) {
  const { method } = req;
  const form = new multiparty.Form();
  //   const data = await new Promise()
  await connectToDB();
  const admin = await isAdminRequest(req, res);

  form.parse(req, async (err, fields, files) => {
    if (err) throw err;
    console.log(files);

    //   console.log(files);

    const client = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_KEY_SECRET,
      },
    });
    let links = [];
    for (const file of files.file) {
      let ext = file.originalFilename.split(".").pop();
      console.log(ext);
      const newFileName = Date.now() + "." + ext;

      await client.send(
        new PutObjectCommand({
          Bucket: "primastore",
          Key: newFileName,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path),
        })
      );
      const link = `https://primastore.s3.amazonaws.com/${newFileName}`;
      console.log(link);
      links.push(link);
      return res.json(links);
    }
  });
}

export const config = {
  api: { bodyParser: false },
};
