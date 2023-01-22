import { ChatCmdRun } from "@/Interfaces";
import RR from "@/models/ReactionRole";
import RRG from "@/models/ReactionRoleGroup";
import { genId } from "@/utilities/gen";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ColorResolvable, EmbedBuilder, resolveColor } from "discord.js";

export const groups: ChatCmdRun = async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    const id = interaction.options.getInteger('id');

    switch (subcommand) {
        case 'list':
            const lGroups = await RRG.find();
            if (!lGroups[0]) return interaction.reply({ content: 'There are no groups.' });
            interaction.reply({ embeds: [new EmbedBuilder({
                title: 'Reaction Role Groups',
                color: client.config('brand.color'),
                description: lGroups.map((g) => {return `**ID:** ${g._id} - **Name:** ${g.name} - **Color:** ${g.color}`}).join('\n'),
                footer: { text: `${client.config('brand.name')} Utility`, icon_url: client.user?.avatarURL()! },
                timestamp: Date.now()
            })] });
            break;

        case 'view':
            const vGroup = await RRG.findById(id);
            if (!vGroup) return interaction.reply({ content: 'The specified group does not exist.' });
            interaction.reply({ embeds: [new EmbedBuilder({
                title: `${vGroup.name} (${vGroup._id})`,
                color: resolveColor(vGroup.color as ColorResolvable),
                description: vGroup.description,
                image: { url: vGroup.image },
                footer: { text: `${client.config('brand.name')} Utility` },
                timestamp: Date.now()
            })] });
            break;

        case 'create':
            let cImage: string|undefined = undefined;
            if (interaction.options.getString('image')) {
                if (!parseUrl(interaction.options.getString('image', true))) return interaction.reply({ content: 'Invalid image url specified.' });
                cImage = interaction.options.getString('image')!;
            }
            if (!validateHex(interaction.options.getString('color', true))) return interaction.reply({ content: 'Invalid color specified.' });
            const cId = genId();
            await RRG.create({
                _id: cId,
                name: interaction.options.getString('name', true),
                color: interaction.options.getString('color', true),
                image: cImage,
                description: interaction.options.getString('description', true)
            });
            interaction.reply({ content: 'Successfully created group.' });
            break;

        case 'delete':
            if (!await RRG.exists({ _id: id })) return interaction.reply({ content: 'The specified group does not exist.' });
            const cancelBtn = new ButtonBuilder({ customId: 'btn.rr.cancel', label: 'Cancel', style: ButtonStyle.Secondary });
            const continueBtn = new ButtonBuilder({ customId: 'btn.rr.continue', label: 'Continue', style: ButtonStyle.Danger });
            const row = new ActionRowBuilder<ButtonBuilder>({ components: [continueBtn, cancelBtn] });
            await interaction.reply({ components: [row], content: '**Warning:** This will delete the specified group and all its reaction roles. Are you sure you want to continue?' });
            cancelBtn.setDisabled(true);
            continueBtn.setDisabled(true);
            const collector = interaction.channel?.createMessageComponentCollector({ max: 1, time: 30000, filter: (i) => i.user.id === interaction.user.id });
            collector?.on('collect', async (int) => {
                if (int.customId === 'btn.rr.cancel') {
                    await int.update({ components: [row] });
                    interaction.followUp({ content: 'Action successfully cancelled.' });
                } else if (int.customId === 'btn.rr.continue') {
                    await int.update({ components: [row] });
                    await RR.deleteMany({ group: id });
                    await RRG.findByIdAndDelete(id);
                    interaction.followUp({ content: 'Successfully deleted group.' });
                }
            });
            break;
    };
};

function parseUrl(url: string): boolean {
	const res = url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
	return res !== null;
};

function validateHex(hex: string): boolean {
	if (hex.startsWith('#') && hex.length == 7) return true;
	return false;
}
