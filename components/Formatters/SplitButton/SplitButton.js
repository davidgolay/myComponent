import { KeyboardTabOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { AiOutlineUp as Arrow } from 'react-icons/ai';

import styles from "./customSplitButton.module.scss"

const SplitButton = (props) => {

    const [isUnfold, setIsUnfold] = useState(false);
    const [finalOptions, setFinalOptions] = useState([]);
    const [totalOptions, setTotalOptions] = useState(0);
    const [selected, setSelected] = useState(0);

    const onClick = () => {
        return "hello";
    }
    //options:

    const isOptionAble = (option) => {
        let isAble = (option.able === 'true' || option.able === true)
        return isAble;
    }

    useEffect(() => {
        let options_MOCK = [
            { name: "Sauvegarder l'état actuel", icon: '↧', onClick: onClick(), able: 'true' },
            { name: 'Provoquer le destin', icon: '↯', onClick: onClick(), able: true },
            { name: 'Exporter mon panier', icon: '↭', onClick: onClick(), able: false },
            { name: 'Retourner produit', icon: '↩', onClick: onClick(), able: 'true' },
            { name: 'Assigner à un collaborateur', icon: '↧', onClick: onClick(), able: true },
            { name: 'option Z', icon: '↧', onClick: onClick(), able: false },
        ]
        let temp = [];
        for (const o of options_MOCK) {
            if (isOptionAble(o)) {
                temp.push(o)
            }
        }
        setFinalOptions(temp);
        setTotalOptions(temp.length)
        console.dir(temp.length)
    }, [])

    return (
        <>
            {(typeof totalOptions !== 'undefined ' && totalOptions > 0) &&
                <div className={styles.container}>
                    {(totalOptions > 1) ?
                        <div className={styles.split}>
                            <>
                                {isUnfold ?
                                    <div style={{ totalOptions: 1 }} className={styles.buttonList}>
                                        {finalOptions.map((option, idx) => {
                                            return (
                                                <div className={[styles.option, styles.unfold, (idx == 0 ? styles.first : undefined)].join(' ')} key={'btn_' + idx}
                                                    onClick={() => {
                                                        setIsUnfold(false);
                                                        setSelected(parseInt(idx));
                                                    }}
                                                >
                                                    {(option.icon?.length > 0) ?
                                                        <div className={styles.icon}>{option.icon}</div>
                                                        :
                                                        <></>
                                                    }
                                                    <div className={styles.content}>{option.name}</div>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                    :
                                    <div className={[styles.buttonList, styles.button, styles.solo, styles.list].join(' ')}>
                                        <div className={styles.option}>
                                            {(finalOptions[selected].icon?.length > 0) ?
                                                <div className={styles.icon}>{finalOptions[selected].icon}</div>
                                                :
                                                <></>
                                            }
                                            <div className={styles.content}>{finalOptions[selected].name}</div>
                                        </div>
                                    </div>
                                }
                            </>
                            <div className={[styles.buttonArrow, styles.button, (!isUnfold ? styles.solo : undefined), styles.arrow].join(' ')}
                                onClick={() => {
                                    setIsUnfold(!isUnfold);
                                }}
                            >
                                <div className={styles.option}>
                                    <div className={[styles.content, (!isUnfold ? styles.reversed : undefined)].join(' ')}>
                                    <Arrow />
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className={[styles.buttonSolo, styles.button].join(' ')}>
                            <div className={styles.option}>
                                <div className={styles.content}>{finalOptions[selected].name}</div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    );
};

SplitButton.propTypes = {};

export default SplitButton;
