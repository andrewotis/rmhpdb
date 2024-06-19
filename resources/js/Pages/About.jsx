import LayoutFour from "../Layouts/LayoutFour";
import Button from "../Components/Button";
import { Link } from '@inertiajs/react';

export default function About({auth}) {
    return (
        <LayoutFour title="About Us" auth={auth}>
            <div className="about-content">
                <section className="intro">
                    <h1 className="text-align-center">Managing Risk to Pregnant Workers</h1>
                    <p className="">
                        Welcome to the Registered Maternity Health Protector (RMHP) Database, a pioneering initiative aimed at managing risk to working women of reproductive age, pregnant workers, and mothers breastfeeding. At RMHP, we are dedicated to establishing a comprehensive registry of individuals who possess the expertise and knowledge to conduct risk assessments for pregnant workers.
                    </p>
                </section>
                <section className="rationale">
                    <h1>Rationale</h1>
                    <p>Conducting risk assessments for workers that are pregnant, may be pregnant, or are breastfeeding is a global activity. These risk assessments are required to be conducted by employees in the European Union under the authority of the European Commission's 1992 Pregnant Workers Directive.</p>
                    <p>
                        In addition to the drivers above, the demand for these risk assessments is expected to grow for other reasons, such as a public health initiative, health promotion or an organization’s demonstration and support for their women workers. In early 2010, women surpassed men as the majority in the U.S. workforce. The recession and future growth jobs such as work in the service industry and healthcare favor women workers over men. Nearly 80% of all women will become pregnant sometime during their working lifetime. More than 2 million children born annually in the U.S. are born from a mom who worked outside the home during her pregnancy.
                    </p>
                </section>
                
                <section className="discussion">
                    <div className="discussion-content">
                        <h1>Discussion</h1>
                        <h2>Understanding Risk Assessment for Pregnant Workers</h2>
                        <p>
                            In light of increasing scientific understanding it is recognized that the major focus of a risk assessment for a pregnant worker is concern for a child’s future health. The focus of the assessment, therefore, is more toward developmental health hazards than reproductive health hazards. Risk assessments combine classic occupational health e.g. reproductive health/OSHA with evolving public health e.g. CDC and EPA awareness of hazards and precautions for an unborn child during the prenatal period. The risk assessment relies substantially more upon professional judgment rather than regulatory compliance.
                        </p>
                        <p>
                            As with any broad topic there is no single source of information that one may rely upon. A starting place to technically approach these risk assessments is best served by reviewing information in the links below:
                        </p>
                        <p>
                            European Union Directive on Pregnant Workers (PDF) TODO GET LINKS<br />
                            Occupational Medicine Resource on Reproductive Health (PDF) TODO GET LINKS
                        </p>
                        <p>
                            A technical understanding of how to approach these risk assessments must be tempered in the U.S. with legal and philosophical limits and inclusions for the assessment. For example, in the U.S. the assessment must be non-discriminatory and risks to the fertility of working men should be included in an overall assessment. The objective of the risk assessment is to communicate the employer’s superior knowledge of workplace hazards to an employee who in turn may share the information with their health care provider(s) to help with decision making to assure a child is born healthy. This “three legged stool” approach is preformed with the understanding that all parties must work-in-kind to achieve mutual objectives.
                        </p>
                        <p>
                            Each organization must determine the value, scope and objectives of the risk assessment. Most employers may clearly establish that the risk assessment is not a favorable treatment nor does it extend any special rights to women workers. The obligation to reduce risks found during the assessment is limited to the provisions that an employer establishes for any temporarily disabled worker. If the employer has no provisions for light-duty work for disabled workers, then light-duty work may not be treatment option for a pregnant worker. These and other issues are expected to be determined by each organization prior to initiating a risk assessment.
                        </p>
                        <p>
                            While each organization may determine the scope of risk a risk assessment, the hazards in Table I and the following “Aspects of Pregnancy” are expected to be assessed (see reference III A).
                        </p>
                    </div>                    
                </section>
                <section className="table">
                    <table>
                        <thead>
                            <tr>
                                <td colspan="2">Table I - Hazards to Pregnant Workers</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mental and physical fatigue and working hours</td>
                                <td>Noise</td>
                            </tr>
                            <tr>
                                <td>Postural problems connected with activity of new or expectant mothers</td>
                                <td>Ionizing radiation</td>
                            </tr>
                            <tr>
                                <td>Work at heights</td>
                                <td>Non-ionizing radiation</td>
                            </tr>
                            <tr>
                                <td>Working alone</td>
                                <td>Extremes of cold or heat</td>
                            </tr>
                            <tr>
                                <td>Occupational stress</td>
                                <td>Work in hyperbaric atmosphere ( for example pressurized enclosures and underwater)</td>
                            </tr>
                            <tr>
                                <td>Standing activities</td>
                                <td>Biological agents</td>
                            </tr>
                            <tr>
                                <td>Sitting activities</td>
                                <td>Chemical agents</td>
                            </tr>
                            <tr>
                                <td>Lack of rest and other welfare facilities</td>
                                <td>Manual handling of loads</td>
                            </tr>
                            <tr>
                                <td>Hazards as a result of inappropriate nutritionRisk of infection or kidney disease as a result of inadequate hygiene facilities</td>
                                <td>Movements and postures</td>
                            </tr>
                            <tr>
                                <td>Hazards as a result of inappropriate nutrition</td>
                                <td>Traveling either inside or outside the establishment</td>
                            </tr>
                            <tr>
                                <td>Hazards due to unsuitable or absent facilities</td>
                                <td>Underground extractive industries</td>
                            </tr>
                            <tr>
                                <td>Shocks, vibration or movement</td>
                                <td>Work with computer equipment</td>
                            </tr>
                            <tr>
                                <td colspan="2">Work equipment and personal protective equpment (including clothing)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className="aspects">
                    <h2>Aspects of Pregnancy</h2>
                    <p>The risk assessment should consider how aspects of pregnancy may require adjustments to work. For example, morning sickness is an aspect of pregnancy. Therefore, the assessment should consider risk factors such as early shift work, exposure to strong or nauseating smells/poor ventilation, and travel/transport. Increasing size, which may alter dexterity, agility, coordination, speed of movement, etc., is another aspect of pregnancy. So is frequent/urgent visits to the toilet. These and other aspects of pregnancy must be assessed to determine if adjustments to work may be warranted.</p>
                </section>
                <section className="future-direction">
                    <div className="container">
                        <div className="col left">
                            <h2>Future Direction</h2>
                            <h1>Charting The Course Ahead</h1>
                            <p>As we look ahead, our commitment to advancing maternity health protection remains unwavering. Our future endeavors aim to enhance the efficacy and reach of our registry, empowering both employers and workers with valuable resources and insights. Through ongoing collaboration and innovation, we strive to elevate standards, promote best practices, and ensure the well-being of pregnant and breastfeeding workers globally. Join us in shaping the future of maternity health protection.</p>
                            <Link href="/register">
                                <Button>REGISTER</Button>
                            </Link>
                        </div>
                        <div className="col right" />
                    </div>  
                </section>
            </div>
        </LayoutFour>
    );
}