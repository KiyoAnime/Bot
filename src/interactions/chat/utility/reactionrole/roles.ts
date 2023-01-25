import { ChatCmdRun } from "@/Interfaces";
import RR from "@/models/ReactionRole";
import RRG from '@/models/ReactionRoleGroup';
import { genId } from "@/utilities/gen";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ColorResolvable, EmbedBuilder, resolveColor, SelectMenuComponentOptionData, StringSelectMenuBuilder, TextChannel } from "discord.js";

export const roles: ChatCmdRun = async (client, interaction) => {
    const subcommand = interaction.options.getSubcommand();
    const id = interaction.options.getInteger('id');

    switch (subcommand) {
        case 'list':
            const lRoles = await RR.find();
            if (!lRoles[0]) return interaction.reply({ content: 'There are no reaction roles.' });
            interaction.reply({ embeds: [new EmbedBuilder({
                title: 'Reaction Roles',
                color: client.config('brand.color'),
                description: lRoles.map((r) => { return `**ID:** ${r._id} - **Name:** ${r.name} - **Role:** <@&${r.role}>` }).join('\n'),
                footer: { text: `${client.config('brand.name')} Utility`, icon_url: client.user?.avatarURL()! },
                timestamp: Date.now()
            })] });
            break;

        case 'view':
            const vRole = await RR.findById(id);
            if (!vRole) return interaction.reply({ content: 'The specified reaction role does not exist.' });
            interaction.reply({ embeds: [new EmbedBuilder({
                title: `${vRole.name} (${vRole._id})`,
                color: client.config('brand.color'),
                fields: [
                    { name: 'Role:', value: `<@&${vRole.role}>` },
                    { name: 'Description:', value: vRole.description }
                ],
                footer: { text: `${client.config('brand.name')} Utility` },
                timestamp: Date.now()
            })] });
            break;

        case 'create':
            if (!await RRG.exists({ _id: interaction.options.getInteger('group') })) return interaction.reply({ content: 'The specified group does not exist.' });
            const cId = genId();
            const cRole = await RR.create({
                _id: cId,
                role: interaction.options.getRole('role', true).id,
                group: interaction.options.getInteger('group'),
                name: interaction.options.getString('name'),
                description: interaction.options.getString('description')
            });
            interaction.reply({ content: `Successfully created reaction role ${cRole.name} (${cRole._id}).` });
            break;

        case 'delete':
            if (!await RR.exists({ _id: id })) return interaction.reply({ content: 'The specified reaction role does not exist.' });
            const cancelBtn = new ButtonBuilder({ customId: 'btn.rr.cancel', label: 'Cancel', style: ButtonStyle.Secondary });
            const continueBtn = new ButtonBuilder({ customId: 'btn.rr.continue', label: 'Continue', style: ButtonStyle.Danger });
            const dRow = new ActionRowBuilder<ButtonBuilder>({ components: [continueBtn, cancelBtn] });
            await interaction.reply({ components: [dRow], content: '**Warning:** This will delete the specified reaction role. Are you sure you want to continue?' });
            cancelBtn.setDisabled(true);
            continueBtn.setDisabled(true);
            const collector = interaction.channel?.createMessageComponentCollector({ max: 1, time: 30000, filter: (i) => i.user.id === interaction.user.id });
            collector?.on('collect', async (int) => {
                if (int.customId === 'btn.rr.cancel') {
                    await int.update({ components: [dRow] });
                    interaction.followUp({ content: 'Action successfully cancelled.' });
                } else if (int.customId === 'btn.rr.continue') {
                    await int.update({ components: [dRow] });
                    await RR.findByIdAndDelete(id);
                    interaction.followUp({ content: 'Successfully deleted reaction role.' });
                }
            });
            break;

        case 'output':
            const oId = interaction.options.getInteger('group', true);
            const multiple = interaction.options.getBoolean('multiple', true);
            const oGroup = await RRG.findById(oId);
            if (!oGroup) return interaction.reply({ content: 'The specified group does not exist.' });
            const channel = interaction.options.getChannel('channel', true);
            if (channel.type !== ChannelType.GuildText) return interaction.reply({ content: 'I cannot send a reaction role embed to that channel type.' });
            await interaction.deferReply();
            const oRoles = await RR.find({ group: oId });
            const components: SelectMenuComponentOptionData[] = [];
            for (const role of oRoles) {
                components.push({ label: role.name, emoji: role.emoji, description: role.description, value: `rr.role.${role._id}` });
            };
            const oRow = new ActionRowBuilder<StringSelectMenuBuilder>({ components: [new StringSelectMenuBuilder({
                customId: `rr.group.${oGroup._id}`,
                options: components,
                minValues: 1,
                maxValues: multiple ? components.length : 1
            })]});
            await (channel as TextChannel).send({ components: [oRow], embeds: [new EmbedBuilder({
                title: oGroup.name,
                color: resolveColor(oGroup.color as ColorResolvable),
                description: oGroup.description,
                footer: { text: `${client.config('brand.name')} Utility`, icon_url: client.user?.avatarURL()! },
                timestamp: Date.now()
            })]});
            await interaction.deleteReply();
            await interaction.followUp({ content: 'Successfully sent embed.' });
            break;
    };
};
