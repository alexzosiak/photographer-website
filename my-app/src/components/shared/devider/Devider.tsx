import '@/scss/divider.scss';

const SectionDivider = () => {
    return (
        <div className="section-divider" aria-hidden="true">
            <div className="ornament-divider">
                <span className="ornament-divider__diamond" />
            </div>
        </div>
    );
};

export default SectionDivider