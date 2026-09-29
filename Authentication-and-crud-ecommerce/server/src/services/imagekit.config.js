import ImageKit, { toFile } from '@imagekit/nodejs';
import config from '../config/env.config.js';

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY
});


async function uploadFiles(buffer , filename){

const uploads  =await client.files.upload({
  file: await toFile(buffer) ,
  fileName: filename,
  folder:"cohort-ecom"

});

return uploads

}


export default uploadFiles