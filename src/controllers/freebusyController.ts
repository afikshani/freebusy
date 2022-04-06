import { Request, Response } from "express";
import { getFree, BlockLike, ScopeTime } from '@kamiazya/freebusy';
import * as timers from "timers";


function handleFreeBusyRequest(req: Request, res: Response) {
    try {
        const data: any = [];
        const queryParams = req.query;
        const stringifiedBlockedSlots = queryParams.blockedSlots;
        const start: string = <string>queryParams.startSearch;
        const end: string = <string>queryParams.endSearch;
        if (typeof stringifiedBlockedSlots === "string") {
            const blockedEvents: BlockLike[] = JSON.parse(stringifiedBlockedSlots);
            // const blockedFormattedEvents: BlockLike[] = blockedEvents.map(item => {
            //     return {
            //         start: item.start?.split(":00 03:00")[0],
            //         end: item.end?.split(":00 03:00")[0],
            //     }
            // });
            const freeBlocks = getFree({
                scope: {
                    start,
                    end,
                    time: new ScopeTime({
                        defaultStart: 9,
                        defaultEnd: 17,
                    }),
                },
                events: blockedEvents,
            });
            freeBlocks.blocks
                .forEach((block) => {
                    const start = block.start.toFormat('DDD T');
                    const end = block.end.toFormat('T');
                    const timeFrame = `${start} - ${end}`;
                    console.log(timeFrame);
                    data.push(timeFrame)
                });
            return res.send({message: data});

        }
        // const events: BlockLike[] = [
        //     {
        //         start: '2019-01-10T09:30',
        //         end: '2019-01-10T10:00',
        //     },
        //     {
        //         start: '2019-01-10T12:00',
        //         end: '2019-01-10T13:00',
        //     },
        //     {
        //         start: '2019-01-10T15:00',
        //         end: '2019-01-10T16:00',
        //     },
        // ];

        // const freeBlocks = getFree({
        //     scope: {
        //         start: '2019-01-10',
        //         end: '2019-01-11',
        //         time: new ScopeTime({
        //             defaultStart: 9,
        //             defaultEnd: 17,
        //         }),
        //     },
        //     events,
        // });
        //
        // freeBlocks.blocks
        //     .forEach((block) => {
        //         const start = block.start.toFormat('DDD T');
        //         const end = block.end.toFormat('T');
        //         console.log(`${start} - ${end}`);
        //     });
    } catch (error: any) {
        console.error({
            message: `Error: ${error.message}`,
        });
        return res.status(500).end(`internal error:\n ${error.message}`);
    }
}


export default handleFreeBusyRequest;