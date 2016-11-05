export const openModal = () => ({
  type: "APP_MODAL_OPEN"
});

export const closeModal = () => ({
  type: "APP_MODAL_CLOSE"
});

export const closeAppLoader = () => ({
  type: "CLOSE_APP_LOADER"
});

export const openAppLoader = () => ({
  type: "OPEN_APP_LOADER"
});

export const displayNotice = (notice) => ({
  type: "DISPLAY_NOTICE",
  notice: notice
});

export const dismissNotice = () => ({
  type: "DISMISS_NOTICE"
});