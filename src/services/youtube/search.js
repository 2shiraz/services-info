import { Innertube } from 'youtubei.js';

const yt = await Innertube.create();

export default async function search(query) {
    try {
        const info = await yt.search(query);

        const json = info.results
            .filter(result => result.type === 'Video') // Filter out objects with type other than "Video"
            .map((result) => {
                const v = result.id;
                const t = result.title.runs[0].text; // Assuming the title is in the first run
                const a = result.author.name;
                const thumbnail = result.thumbnails[0].url;
                const d = result.duration.text;
                const views = result.short_view_count.text;

                return {
                    v,
                    t,
                    a,
                    thumbnail,
                    d,
                    views,
                };
            });

        return json;
    } catch (e) {
        console.error(e); // Log the error for further investigation
        return { error: 'ErrorCantConnectToServiceAPI' };
    }
}
