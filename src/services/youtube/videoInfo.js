import { Innertube } from 'youtubei.js';

const yt = await Innertube.create();

export default async function getVidInfo(id){
    try {
        const info = await yt.getBasicInfo(id, 'ANDROID');

        if (!info) 
            return { error: 'ErrorCantConnectToServiceAPI' };
        else if (info.playability_status.status !== 'OK') 
            return { error: 'ErrorYTUnavailable' };
        else if (info.basic_info.is_live) 
            return { error: 'ErrorLiveVideo' };
        else if (info.basic_info.is_private) 
            return { error: 'ErrorPrivateVideo' };
        else if (info.basic_info.is_upcoming) 
            return { error: 'ErrorUpcomingVideo' };
        else
            return info;
    } catch (e) {
        return { error: 'ErrorCantConnectToServiceAPI' };
    }
    
}
