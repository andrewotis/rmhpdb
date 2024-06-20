import { State, City } from "country-state-city";
export default function Test({}) {

    return (
        <>$array = [<br />
            {
                State.getStatesOfCountry('US').map(state => {
                    return (
                        <>
                            '{state.name}' =><br />[
                                {
                                    City.getCitiesOfState('US', state.isoCode).map(city => {
                                        return (
                                            <>
                                                "{city.name}",{` `}
                                            </>
                                        );
                                    })
                                }
                            ],<br />
                        </>
                    )
                })
            }
        </>
    );
}

/*
$array = [
    'alabama' => ['city1', 'city2'],
    'alaska' => ['city1', 'city2'],
]

*/