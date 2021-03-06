import { WeebCommand, WeebCommandOptions } from '@lib/structures/WeebCommand';
import { LanguageKeys } from '@lib/types/namespaces/LanguageKeys';
import { ApplyOptions } from '@skyra/decorators';

@ApplyOptions<WeebCommandOptions>({
	description: (language) => language.get(LanguageKeys.Commands.Weeb.CuddleDescription),
	extendedHelp: (language) => language.get(LanguageKeys.Commands.Weeb.CuddleExtended),
	queryType: 'cuddle',
	responseName: LanguageKeys.Commands.Weeb.Cuddle,
	usage: '<user:username>'
})
export default class extends WeebCommand {}
