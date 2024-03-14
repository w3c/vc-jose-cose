import { diagnose } from 'cbor-web'
import { unwrap } from './text'

export const parse = async (data: string | Buffer) => {
    if (typeof data === 'string'){
        return unwrap(data.trim())
    }
    const diag = await diagnose(data);
    return unwrap(diag.trim())
}