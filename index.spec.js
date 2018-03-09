import Browser from './index';
import * as Interfaces from './index';


describe('Index', () => {
    it('should have classes exported', () => {
        expect(Interfaces.Permissions).toBeDefined();
    });

    it('should have interfaces defined', () => {
        expect(Browser.permissions).toBeDefined();
    });
});
