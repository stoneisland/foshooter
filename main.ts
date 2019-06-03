import * as yargs from 'yargs';
import { transform } from './jpg-transform';
import { readdirRecursively } from './readdir';
import { jpgFilter } from './jpg-filter';
import { map, flatMap } from 'rxjs/operators';
import { relative } from 'path';
import { S3 } from 'aws-sdk';
import { config } from "dotenv"

config({ path: ".env" })

//TODO complete
const argv = yargs
  .usage('Usage: node $0 --in [in] --out [out')
  .option('in', {
    alias: 'i',
    description: 'Folder to process',
    type: 'string'
  }
  )
  .option('out', {
    alias: 'o',
    description: 'Destination',
    type: 'string'
  }
  ) 
//  .demandOption(['out'])
  .argv;

const from = argv.in || '.';
//const to = argv.out || 'test-out'

/*
let saveToFileSystem = v => {
  console.log(v.path);
  //Handle errors
  const dir = join(to, relative(from, dirname(v.path)));
  mkdirp(dir, () => {
    //TODO Handle error
    writeFile(join(to, basename(v.path)), v.buffer, function () { });
  });
};
*/

function publish(from: string, to?: string) {

  const s3 = new S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
  })

  readdirRecursively(from, jpgFilter).pipe(map(v => transform(v)), flatMap(v => v))
    .subscribe(
      v => {
        const params = {
          Bucket: 'foshooter',
          Body: v.buffer,
          Key: relative(from, v.path)
        };

        s3.upload(params, function (err, data) {
          //handle error
          if (err) {
            console.log("Error", err);
          }

          //success
          if (data) {
            console.log("Uploaded in:", data.Location);
          }
        });

        //saveToFileSystem
      }
    );
}

//publish(from, to);
publish(from);
