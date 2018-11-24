import { WeebCommand } from '../../index';

export default class extends WeebCommand {

	public constructor(client: Client, store: CommandStore, file: string[], directory: string) {
		super(client, store, file, directory, {
			description: (language) => language.get('COMMAND_WNOM_DESCRIPTION'),
			extendedHelp: (language) => language.get('COMMAND_WNOM_EXTENDED'),
			queryType: 'nom',
			responseName: 'COMMAND_WNOM'
		});
	}

}