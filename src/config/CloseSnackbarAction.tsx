import { IconButton } from '@mui/material';
import { SnackbarKey, useSnackbar } from 'notistack';
import { FC, memo } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Props {

  /** Id of snackbar. */
  readonly id: SnackbarKey;
}

const CloseSnackbarActionComponent: FC<Props> = ({ id }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      onClick={() => {
        closeSnackbar(id);
      }}
    >
      <CloseIcon color='inherit' />
    </IconButton>
  );
};

export const CloseSnackbarAction = memo(CloseSnackbarActionComponent);
