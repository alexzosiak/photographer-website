import Form from '@/components/contact-page/form/Form';

const packageMessages: Record<string, string> = {
    mini: 'Hi Viktoria! We would love to inquire about availability for the Wedding MINI (160 €) package.',
    standart:
        'Hi Viktoria! We would love to inquire about availability for the Wedding STANDART (250 €) package.',
    maximum:
        'Hi Viktoria! We would love to inquire about availability for the Wedding MAXIMUM (350 €) package.',
};

const Contact = async ({
    searchParams,
}: {
    searchParams: Promise<{ package?: string | string[] }>;
}) => {
    const params = await searchParams;
    const selectedPackage =
        typeof params.package === 'string' ? params.package : '';
    const initialMessage = Object.hasOwn(packageMessages, selectedPackage)
        ? packageMessages[selectedPackage]
        : '';
    const dateParts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Dublin',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());
    const datePart = (type: string) =>
        dateParts.find((part) => part.type === type)?.value;
    const minDate = `${datePart('year')}-${datePart('month')}-${datePart('day')}`;
    return (
        <>
            <Form
                key={selectedPackage}
                initialMessage={initialMessage}
                minDate={minDate}
            />
        </>
    );
};

export default Contact;
