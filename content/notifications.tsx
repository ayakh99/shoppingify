import {
  CancelRounded,
  CheckCircleRounded,
  FastfoodRounded,
  LocalCafeRounded,
  NoFoodRounded,
  PlaylistAddCheckRounded,
  PlaylistAddRounded,
  PlaylistRemoveRounded,
} from '@mui/icons-material';

const props = {
  radius: 12,
  autoClose: 5000,
};

const notificationsContent = {
  signup: {
    title: 'Account created',
    message: 'You can now sign in to your account!',
    icon: <CheckCircleRounded />,
    color: 'cyan.3',
    ...props,
  },
  signin: {
    title: 'Signed in successfully',
    message: 'You will now be redirected to your home page!',
    icon: <CheckCircleRounded />,
    color: 'green.4',
    ...props,
  },
  listCreate: {
    title: 'List created',
    message: 'You can now add items to your new shopping list!',
    icon: <PlaylistAddRounded />,
    color: 'cyan.3',
    ...props,
  },
  listUpdate: {
    title: 'List updated',
    message: 'Your changes were saved successfully!',
    icon: <PlaylistAddCheckRounded />,
    color: 'green.4',
    ...props,
  },
  complete: {
    title: 'List completed',
    message: 'You can undo this action in your list history.',
    icon: <PlaylistAddCheckRounded />,
    color: 'cyan.3',
    ...props,
  },
  cancelled: {
    title: 'List cancelled',
    message: 'You can undo this action in your list history.',
    icon: <PlaylistRemoveRounded />,
    color: 'red.3',
    ...props,
  },
  active: {
    title: 'List activated',
    message: 'You can now edit your list!',
    icon: <PlaylistAddCheckRounded />,
    color: 'green.4',
    ...props,
  },
  itemCreate: {
    title: 'Item created',
    message: 'You can now add this item to your shopping lists!',
    icon: <FastfoodRounded />,
    color: 'cyan.3',
    ...props,
  },
  itemUpdate: {
    title: 'Item updated',
    message: '',
    icon: <FastfoodRounded />,
    color: 'green.4',
    ...props,
  },
  itemDelete: {
    title: 'Item deleted',
    message: '',
    icon: <NoFoodRounded />,
    color: 'red.3',
    ...props,
  },
  noActiveListsError: {
    title: 'Error',
    message: 'You currently have no active lists',
    icon: <CancelRounded />,
    color: 'red.3',
    ...props,
  },
  itemAlreadyExistsError: {
    title: 'Item already in your list',
    message: 'The item you selected is already in your active list',
    icon: <CancelRounded />,
    color: 'red.3',
    ...props,
  },
  categoryCreate: {
    title: 'Category created',
    message: 'You can now add items to your new category!',
    icon: <LocalCafeRounded />,
    color: 'cyan.3',
    ...props,
  },
  userUpdate: {
    title: 'Account info updated successfully!',
    message: '',
    icon: <CheckCircleRounded />,
    color: 'green.4',
    ...props,
  },
  userUpdateSignin: {
    title: 'Account info updated successfully!',
    message: 'Please re-sign in to your account',
    icon: <CheckCircleRounded />,
    color: 'green.4',
    ...props,
  },
  error: {
    title: 'An error occurred',
    message: 'Please try again.',
    icon: <CancelRounded />,
    color: 'red.3',
    ...props,
  },
};

export default notificationsContent;
