import {
    Box, Paper,
    Button, useTheme,
    Icon, Divider,
    Skeleton, Typography, useMediaQuery, Theme
} from '@mui/material';


interface IFerramentasDeDetalhesProps {
    textoBotaoNovo?: string,

    mostrarSalvar?: boolean;
    mostrarSalvarEVoltar?: boolean;
    mostrarApagar?: boolean;
    mostrarNovo?: boolean;
    mostrarVoltar?: boolean;

    mostrarSalvarCarregando?: boolean;
    mostrarSalvarEVoltarCarregando?: boolean;
    mostrarApagarCarregando?: boolean;
    mostrarNovoCarregando?: boolean;
    mostrarVoltarCarregando?: boolean;


    aoSalvar?: () => void;
    aoSalvarEContinuar?: () => void;
    aoApagar?: () => void;
    aoAdicionarNovo?: () => void;
    aoVoltar?: () => void;

}

export const FerramentasDeDetalhes: React.FC<IFerramentasDeDetalhesProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarSalvar = true,
    mostrarSalvarEVoltar = false,
    mostrarApagar = true,
    mostrarNovo = true,
    mostrarVoltar = true,

    mostrarSalvarCarregando = false,
    mostrarSalvarEVoltarCarregando = false,
    mostrarApagarCarregando = false,
    mostrarNovoCarregando = false,
    mostrarVoltarCarregando = false,

    aoSalvar,
    aoSalvarEContinuar,
    aoApagar,
    aoAdicionarNovo,
    aoVoltar,

}) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();
    return (
        <Box
            component={Paper}
            display='flex'
            height={theme.spacing(5)}
            paddingX={2}
            padding={1}
            margin={1}
            gap={1}
            alignItems='center'
        >
            {(mostrarSalvar && !mostrarSalvarCarregando) && (<Button
                variant='contained'
                color='primary'
                onClick={aoSalvar}
                startIcon={<Icon>save</Icon>}
            >
                <Typography noWrap textOverflow='ellipsis' overflow='hidden'>
                    Salvar
                </Typography>
            </Button>)}

            {mostrarSalvarCarregando &&
                (<Skeleton width={110} height={60} />)
            }

            {(mostrarSalvarEVoltar && !mostrarSalvarEVoltarCarregando && !smDown && !mdDown)
                && (<Button
                    variant='outlined'
                    color='primary'
                    onClick={aoSalvarEContinuar}
                    startIcon={<Icon>save</Icon>}
                >
                    <Typography noWrap textOverflow='ellipsis' overflow='hidden'>
                        Salvar e Voltar
                    </Typography>
                </Button>)}

            {(mostrarSalvarEVoltarCarregando && !smDown && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(mostrarApagar && !mostrarApagarCarregando) && (<Button
                variant='outlined'
                color='primary'
                onClick={aoApagar}
                startIcon={<Icon>delete_outline</Icon>}
            >
                {!smDown && (<Typography noWrap textOverflow='ellipsis' overflow='hidden'>
                    Apagar
                </Typography>)}
            </Button>)}

            {mostrarApagarCarregando &&
                (<Skeleton width={115} height={60} />)
            }

            {(mostrarNovo && !mostrarNovoCarregando && !smDown) && (<Button
                variant='outlined'
                color='primary'
                onClick={aoAdicionarNovo}
                startIcon={<Icon>add</Icon>}
            >
                <Typography noWrap textOverflow='ellipsis' overflow='hidden'>
                    {textoBotaoNovo}
                </Typography>
            </Button>)}

            {(mostrarNovoCarregando && !smDown) &&
                (<Skeleton width={110} height={60} />)
            }

            {mostrarVoltar &&
                (mostrarSalvar || mostrarSalvarEVoltar || mostrarApagar || mostrarNovo)
                && (<Divider variant='middle' orientation='vertical' />
                )}

            {(mostrarVoltar && !mostrarVoltarCarregando) && (<Button
                variant='outlined'
                color='primary'
                onClick={aoVoltar}
                startIcon={<Icon>arrow_back</Icon>}
            >
                {!smDown && (<Typography noWrap textOverflow='ellipsis' overflow='hidden'>
                    Voltar
                </Typography>)}
            </Button>)}

            {mostrarVoltarCarregando &&
                (<Skeleton width={110} height={60} />)
            }
        </Box>
    );
};