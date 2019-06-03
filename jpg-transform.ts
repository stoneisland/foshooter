import * as sharp from 'sharp';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export const transform: (v: string) => Observable<{ path: string, buffer: Buffer }> = (v: string) => {

    return from(sharp(v).jpeg({
        //Just examples: see documentation
        quality: 100,
        chromaSubsampling: '4:4:4'
    }).resize(200, 200, { fit: sharp.fit.inside }).toBuffer()).pipe(map(buffer => { return { path: v, buffer } }));
}
