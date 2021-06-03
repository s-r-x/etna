import { SettingsSelectors } from "@/domains/settings/store/selectors";
import { close as closeSettings } from "@/domains/settings/store/slice";
import { useEffect } from "react";
import { useDispatch, useStore } from "react-redux";
import { useHistory } from "react-router";

export const useRouterSideEffects = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useStore();
  useEffect(() => {
    return history.listen(() => {
      const state = store.getState();
      if (SettingsSelectors.isOpen(state)) {
        dispatch(closeSettings());
      }
    });
  }, []);
};
