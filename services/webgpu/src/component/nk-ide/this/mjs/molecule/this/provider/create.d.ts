import { IExtension } from './../../this/model';
import InstanceService from './../../this/services/instanceService';
export interface IConfigProps {
    /**
     * Molecule Extension instances, after the MoleculeProvider
     * did mount, then handle it.
     */
    extensions?: IExtension[];
    /**
     * Specify a default locale Id, the Molecule built-in `zh-CN`, `en` two languages, and
     * default locale Id is `en`.
     */
    defaultLocale?: string;
}
export default function create(config: IConfigProps): InstanceService;
/**
 * Do NOT call it in production, ONLY used for test cases
 */
export declare function clearInstance(): void;
