import ImageKit,{toFile} from '@imagekit/nodejs';


//imagekit ko server se connect karegaa

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile({buffer,fileName,folder=''}){
  const file =   await imagekit.files.upload({
  file: await toFile(Buffer.from(buffer), 'file'),
  fileName: fileName,
  folder
});
return file
}

export default {uploadFile}
