import Client from '@/Client';
import { createCanvas, loadImage, registerFont } from 'canvas';
import { GuildMember, AttachmentBuilder, TextChannel } from 'discord.js';

export default async (client: Client, member: GuildMember) => {
    if (member.guild.id !== client.config('guild')) return;
    const role = member.guild.roles.cache.get(client.config('roles.member'));
    if (role) await member.roles.add(role, 'Automated Action: Autorole');
    registerFont('./src/assets/nunito.ttf', { family: 'Nunito' });

    const background = await loadImage('./src/assets/welcome-banner.png');
    const avatar = await loadImage(member.user.displayAvatarURL({ size: 256, forceStatic: true, extension: 'png' }));
    const canvas = createCanvas(1456, 520);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(background, 0, 0);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.roundRect(38, 38, canvas.width - 2 * 38, canvas.height - 2 * 38, 100);
    ctx.fill();
    ctx.closePath();
    ctx.save();

    ctx.beginPath();
    ctx.arc(canvas.width / 2, 60 + avatar.height / 2, avatar.width / 2, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, canvas.width / 2 - avatar.width / 2, 60);
    ctx.restore();

    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    ctx.font = '68px Nunito';
    ctx.fillText(`Welcome ${member.user.username} to Kiyo!`, canvas.width / 2, avatar.height + 136);

    ctx.font = '40px Nunito';
    ctx.fillText(`Member #${member.guild.memberCount}. Please make sure to read the rules.`, canvas.width / 2, avatar.height + 196);

    const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'welcome-card.png' });
    (client.channels.cache.get(client.config('channels.welcome')) as TextChannel).send({ content: `Welcome <@!${member.user.id}>,`, files: [attachment] });
};
