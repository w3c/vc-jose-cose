import { cbor } from '@transmute/cose'
import { unwrap } from './text'

export const parse = async (data: string | Uint8Array) => {
    if (typeof data === 'string'){
        return unwrap(data.trim())
    }
    const diag = await cbor.diagnose(data);
    return unwrap(diag.trim())
}