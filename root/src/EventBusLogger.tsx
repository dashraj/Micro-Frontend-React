import { FC, memo, useEffect } from 'react';
import { useHostInputChannel, useHostOutputChannel } from './hooks';

export const HostEventBusLogger: FC = memo(function HostEventBusLogger() {
    const outputChannel = useHostOutputChannel();
    const inputChannel = useHostInputChannel();

    useEffect(() => {
        const outputSubscription = outputChannel.subscribe((event) => {
            console.log('event.received at host', event);
        });
        const inputSubscription = inputChannel.subscribe((event) => {
            console.log('event.sent from host', event);
        });
        return () => {
            outputSubscription.dispose();
            inputSubscription.dispose();
        };
    }, [inputChannel, outputChannel]);

    return null;
});
