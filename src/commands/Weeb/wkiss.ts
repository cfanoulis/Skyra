import { WeebCommand, WeebCommandOptions } from '@lib/structures/WeebCommand';
import { LanguageKeys } from '@lib/types/namespaces/LanguageKeys';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<WeebCommandOptions>({
	description: (language) => language.get(LanguageKeys.Commands.Weeb.KissDescription),
	extendedHelp: (language) => language.get(LanguageKeys.Commands.Weeb.KissExtended),
	queryType: 'kiss',
	responseName: LanguageKeys.Commands.Weeb.Kiss,
	usage: '<user:username>'
})
export default class extends WeebCommand {}
