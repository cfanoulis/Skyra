import { ModerationCommand, ModerationCommandOptions } from '@lib/structures/ModerationCommand';
import { GuildSettings } from '@lib/types/namespaces/GuildSettings';
import { LanguageKeys } from '@lib/types/namespaces/LanguageKeys';
import { ArgumentTypes, isNumber } from '@sapphire/utilities';
import { ApplyOptions } from '@skyra/decorators';
import { Moderation } from '@utils/constants';
import { getImage } from '@utils/util';
import { KlasaMessage } from 'klasa';

@ApplyOptions<ModerationCommandOptions>({
	aliases: ['sb'],
	description: (language) => language.get(LanguageKeys.Commands.Moderation.SoftBanDescription),
	extendedHelp: (language) => language.get(LanguageKeys.Commands.Moderation.SoftBanExtended),
	requiredMember: false,
	requiredPermissions: ['BAN_MEMBERS']
})
export default class extends ModerationCommand {
	public prehandle(...[message]: ArgumentTypes<ModerationCommand['prehandle']>) {
		return message.guild!.settings.get(GuildSettings.Events.BanAdd) || message.guild!.settings.get(GuildSettings.Events.BanRemove)
			? { unlock: message.guild!.moderation.createLock() }
			: null;
	}

	public async handle(...[message, context]: ArgumentTypes<ModerationCommand['handle']>) {
		return message.guild!.security.actions.softBan(
			{
				userID: context.target.id,
				moderatorID: message.author.id,
				duration: context.duration,
				reason: context.reason,
				imageURL: getImage(message)
			},
			this.getDays(message),
			await this.getTargetDM(message, context.target)
		);
	}

	public posthandle(...[, { preHandled }]: ArgumentTypes<ModerationCommand<Moderation.Unlock>['posthandle']>) {
		if (preHandled) preHandled.unlock();
	}

	public async checkModeratable(...[message, context]: ArgumentTypes<ModerationCommand['checkModeratable']>) {
		const member = await super.checkModeratable(message, context);
		if (member && !member.bannable) throw message.language.get(LanguageKeys.Commands.Moderation.BanNotBannable);
		return member;
	}

	private getDays(message: KlasaMessage) {
		const regex = new RegExp(message.language.get(LanguageKeys.Commands.Moderation.ModerationDays), 'i');
		for (const [key, value] of Object.entries(message.flagArgs)) {
			if (regex.test(key)) {
				const parsed = Number(value);
				if (isNumber(parsed) && parsed >= 0 && parsed <= 7) return parsed;
			}
		}
		return 0;
	}
}
