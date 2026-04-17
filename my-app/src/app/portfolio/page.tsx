import PortfolioHero from '@/components/PortfolioHero/PortfolioHero';
import PortfolioFilter from '@/components/PortfolioFilter/PortfolioFilter';
import PortfolioWorks from '@/components/PortfolioWorks/PortfolioWorks';

const Portfolio = (): JSX.Element => {
    return (
        <>
            <PortfolioHero/>
            <PortfolioFilter/>
            <PortfolioWorks/>
        </>
    )
}

export default Portfolio;