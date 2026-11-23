import Price from '@/components/price-page/price/Price';
import Faq from '@/components/price-page/faq/Faq';
import SectionDivider from '@/components/shared/devider/Devider';
import PhotographerQuote from '@/components/price-page/photographer-quote/PhotographerQuote';

const PricePage = () => {
    return (
        <>
            <Price/>
            <SectionDivider/>
            <PhotographerQuote/>
            <SectionDivider/>
            <Faq/>
        </>
    )
}

export default PricePage;
