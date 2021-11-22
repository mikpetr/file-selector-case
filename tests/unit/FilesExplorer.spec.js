import { shallowMount, createLocalVue } from '@vue/test-utils';
import { Button, Icon } from 'ant-design-vue';
import FilesExplorer from '@/components/FilesExplorer.vue';

describe('FilesExplorer.vue', () => {
  it('shows back button when there is parent folder', () => {
    const localVue = createLocalVue();
    localVue.use(Button);
    localVue.use(Icon);

    const wrapper = shallowMount(FilesExplorer, {
      localVue,
      data() {
        return {
          currentFolder: {
            id: 'test-id-1',
            name: 'Test folder',
            parentFolder: {},
          },
        };
      },
    });

    expect(wrapper.find('.button.back').exists()).toBeTruthy();
  });
});
