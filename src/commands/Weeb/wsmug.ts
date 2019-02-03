import { CommandStore, KlasaClient } from 'klasa';
import { WeebCommand } from '../../lib/structures/WeebCommand';

export default class extends WeebCommand {

	public constructor(client: KlasaClient, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			description: (language) => language.get('COMMAND_WSMUG_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_WSMUG_EXTENDED'),
			queryType: 'smug',
			responseName: 'COMMAND_WSMUG'
		});
	}

}
