import { from, Observable } from 'rxjs';
import * as sharp from 'sharp';

export function blur(buffer: Buffer, sigma: number): Observable<Buffer> {
  return from(
    sharp(buffer)
      .blur(sigma)
      .toBuffer(),
  );
}

export function resize(buffer: Buffer, size: number): Observable<Buffer> {
  return from(
    sharp(buffer)
      .resize(size, size, { fit: sharp.fit.inside })
      .toBuffer(),
  );
}

/*

nome.jpg     ---- HD   --- nome.jpg
                       --- nome_Blur.jpg
             ---- 256w --- 256w_nome.jpg
                       --- 256w_nome_Blur.jpg
             ---- 512w --- 512w_nome.jpg
                       --- 512w_nome_Blur.jpg
             ---- 640w --- 640w_nome.jpg
                       --- 640w_nome_Blur.jpg
             .............................................

             Fare il blur prima possibile

*/
